type PersonInfo = {
  nickname: string;
  blog: string;
  email: string;
  avatar?: string;
}

type CreateTip = (tipType: string, message: string, time: number = 3000) => void
