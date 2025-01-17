
interface User {
  name: string;
  lastName: string;
  age?: number;
  email: string;
}

const showName = (userdata: User) => {
  
}

showName({ name: "Luis", lastName: "Mera", email: "luis@mail.com"  })