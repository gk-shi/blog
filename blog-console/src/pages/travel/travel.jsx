
import React from 'react'
import styles from './travel.less'
import LabelInput from '../../components/labelInput/LabelInput'
import UploadImg from '../../components/uploadImg/UploadImg'
import { Pagination } from 'antd'
import { openNotificationWithIcon } from '../../components/notification/Notification'
import { searchCityService } from '../../services/request'
import { connect } from 'dva'
import ModalCom from '../../components/modal/Modal'

@connect(state => ({ citys: state.travel.citys, count: state.travel.count }), {
  getCity: (condition) => ({ type: 'travel/getCity', payload: condition }),
  addCity: (city) => ({ type: 'travel/addCity', payload: city }),
  updateCity: (condition) => ({ type: 'travel/updateCity', payload: condition }),
  deleteCity: (condition) => ({ type: 'travel/deleteCity', payload: condition })
})
class Travel extends React.Component {

  state = {
    address: '',
    name: '',
    img: '',
    longitude: '',
    latitude: '',
    searchHandler: null,
    page: 1,  // 默认第一页显示
    citys: [],
    canSet: new Array(10).fill(0),
    oprateType: '',
    visible: false,
    confirmLoading: false
  }

  uploadImg = (info, index) => {
    switch (info.file.status) {
    case 'done':
      openNotificationWithIcon('success', '上传成功！')
      // eslint-disable-next-line no-case-declarations
      const img = `${process.env.UMI_APP_IMG}/${info.file.response.key}`
      if (typeof index !== typeof 0) {
        this.setState({
          img
        })
      } else {
        const citys = [].concat(this.state.citys)
        citys[index]['img'] = img
        this.setState({
          citys: [...citys]
        })
      }

      break
    case 'error':
      openNotificationWithIcon('error', '上传失败')
      break
    default:
      break
    }
  }

  changeNewCity = (type, e) => {
    const o ={}
    o[type] = e.target.value
    this.setState({
      ...o
    })
  }

  searchCity = async (city, address) => {
    try {
      const ret = await searchCityService(city, address)
      const [longitude, latitude] = ret.data.geocodes[0].location.split(',')
      this.setState({
        longitude,
        latitude
      })
    } catch (error) {
      throw new Error(error)
    }
  }

  blur = () => {
    if (!this.state.address) return
    this.state.searchHandler && clearTimeout(this.state.searchHandler)
    const { name: city, address } = this.state
    this.setState({
      searchHandler: setTimeout(() => {
        this.searchCity(city, address)
      }, 500)
    })
  }

  addCity = async () => {
    const { name, img, longitude, latitude } = this.state
    if (!name || !longitude || !latitude) {
      openNotificationWithIcon('warn', '有未填内容！', '城市以及经度、纬度是必填信息！')
    }
    const ret = await this.props.addCity({ name, img, longitude, latitude })
    if (ret && ret.error) {
      openNotificationWithIcon('error', '添加失败', ret.message)
      return
    }
    openNotificationWithIcon('success', '添加成功！')
    this.getCity(0, true)
    this.setState({
      page: 1,
      img: '',
      name: '',
      longitude: '',
      latitude: ''
    })
  }

  getCity = async (page, first) => {
    if (!this.props.citys[page + 1] || first) {
      const ret = await this.props.getCity({ page, first })
      if (ret && ret.error) {
        openNotificationWithIcon('error', '获取城市失败！', ret.message)
      }
    }
    this.nowDisplayCity(page)
  }

  nowDisplayCity = (page) => {
    // page 从 0 开始
    // const [ start, end ] = [page * 10, (page + 1) * 10]
    const citys = JSON.parse(JSON.stringify(this.props.citys[page + 1]))
    if (citys.length !== 0) {
      return this.setState({
        citys: [...citys]
      })
    }
  }

  modifyCity = (type, idx, e) => {
    const citys = [].concat(this.state.citys)
    citys[idx][type] = e.target.value
    this.setState({
      citys: [...citys]
    })
  }

  setOprate = (index, opt) => {
    this.setState({
      visible: true,
      oprateType: opt,
      oprateIndex: index
    })
  }

  onOk = async () => {
    this.setState({
      confirmLoading: true
    })
    const { oprateType, oprateIndex, citys, page } = this.state
    const title = oprateType === 'update' ? '修改' : '删除'
    let ret
    if (oprateType === 'delete') {
      ret = await this.props.deleteCity({ _id: citys[oprateIndex]._id })
    } else {
      const [noChange, newInfo] = this.checkInfo(page, oprateIndex)
      if (noChange) {
        this.setState({
          visible: false,
          confirmLoading: false
        })
        return openNotificationWithIcon('warn', '无法提交', '检测没有内容发生修改，请仔细检查一遍。')
      } else {
        newInfo.id = citys[oprateIndex]._id
        ret = await this.props.updateCity(newInfo)

      }
    }
    await this.getCity(0, true)
    this.setState({
      visible: false,
      confirmLoading: false,
      canSet: new Array(10).fill(0),
      page: 1
    })
    if (ret && ret.error) {
      openNotificationWithIcon('error', `${title}失败！`, ret.message)
      return
    }
    openNotificationWithIcon('success', `${title}成功！`)
  }

  checkInfo = (page, index) => {
    const oCity = this.props.citys[page][index]
    const nCity = this.state.citys[index]
    const newInfo = {}
    let noChange = true
    for (const key of Object.keys(oCity)) {
      if (oCity[key] !== nCity[key]) {
        noChange = false
        newInfo[key] = nCity[key]
      }
    }
    return [noChange, newInfo]
  }

  onCancel = () => {
    this.setState({
      visible: false
    })
  }

  pageChange = (page) => {
    this.setState({
      page,
      canSet: new Array(10).fill(0)
    })
    this.getCity(page - 1)
  }

  updateCanSet = (index) => {
    const set = [].concat(this.state.canSet)
    set[index] = set[index] === 0 ? 1 : 0
    this.setState({
      canSet: [...set]
    })
  }

  showCitys = () => {
    if (this.state.citys.length === 0) return []
    return this.state.citys.map((item, index) => {
      return (
        <div key={item._id}
          className={styles.citys}>
          <div className={styles.left}>
            <LabelInput disabled={this.state.canSet[index] === 0}
              value={this.state.citys[index]['name']}
              onChange={(e) => this.modifyCity('name', index, e)}
              label="城市" />
            <div className={styles.cover}>
              <span className={styles.label}>图片</span>
              <UploadImg
                disabled={this.state.canSet[index] === 0}
                avatar={this.state.citys[index]['img']}
                uploadStatus={(info) => this.uploadImg(info, index)}
              />
            </div>
            <div className={styles.location}>
              <LabelInput disabled={this.state.canSet[index] === 0}
                value={this.state.citys[index]['longitude']}
                onChange={(e) => this.modifyCity('longitude', index, e)}
                className={styles.longitude}
                label="经度" />
              <LabelInput
                disabled={this.state.canSet[index] === 0}
                value={this.state.citys[index]['latitude']}
                onChange={(e) => this.modifyCity('latitude', index, e)}
                label="纬度" />
            </div>
          </div>
          <div className={styles.right}>
            <a href="void:;"
              disabled={this.state.canSet[index] === 0}
              onClick={() => this.setOprate(index, 'update')}
            >确认</a>
            <i>|</i>
            <a href="void:;"
              onClick={() => this.updateCanSet(index)}>修改</a>
            <i>|</i>
            <a href="void:;"
              onClick={() => this.setOprate(index, 'delete')}>删除</a>
          </div>
        </div>
      )
    })
  }

  componentDidMount () {
    this.getCity(0, true)
  }

  render () {
    const { address, name, longitude, latitude, page } = this.state
    const { count } = this.props
    return (
      <div>
        <div className={styles.citys}>
          <div className={styles.left}>
            <LabelInput value={name}
              onChange={(e) => this.changeNewCity('name', e)}
              label="城市" />
            <LabelInput value={address}
              placeholder="辅助定位经纬度的具体城市地址"
              onChange={(e) => this.changeNewCity('address', e)}
              onBlur={() => this.blur()}
              label="详细地址" />
            <span style={{ color: '#ff0000', fontSize: 13 }}>* 需输入详细城市信息，blur 500ms 后才能使用搜索经纬度功能</span>
            <div className={styles.cover}>
              <span className={styles.label}>图片</span>
              <UploadImg uploadStatus={(info) => this.uploadImg(info)} />
            </div>
            <div className={styles.location}>
              <LabelInput value={longitude}
                onChange={(e) => this.changeNewCity('longitude', e)}
                className={styles.longitude}
                label="经度" />
              <LabelInput value={latitude}
                onChange={(e) => this.changeNewCity('latitude', e)}
                label="纬度" />
            </div>
          </div>
          <div className={styles.right}>
            <a href="void:;"
              onClick={() => this.addCity()}>添加</a>
          </div>
        </div>
        {this.showCitys()}
        <Pagination onChange={(page) => this.pageChange(page)}
          className={styles.pagination}
          current={page}
          total={count} />
        <span>共有{count}条</span>
        <ModalCom title="操作提示"
          visible={this.state.visible}
          confirmLoading={this.state.confirmLoading}
          handleOk={() =>this.onOk()}
          handleCancel={() => this.onCancel()} >{this.state.oprateType === 'update' ? '确认提交？' : '确认删除？'}</ModalCom>
      </div>
    )
  }
}

export default Travel