export const generateToken = () =>
  Array.from(
    { length: 6 },
    () => "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"[Math.floor(Math.random() * 36)]
  ).join("");

export const emptyPatient = (token) => {
  return {
    localDataSave: "WithMe-Data",
    token: token,
    name: "Anonimo",
    surname: "Anonimo",
    cf: null,
    birthdate: null,
    info: {
      description: null,
      interests: []
    },
    games: []
  }
}

export const getAge = (date) => {
  if(date){
    const dob = new Date(date);
    const currentDate = new Date();
    const age = currentDate.getFullYear() - dob.getFullYear();
    if (currentDate.getMonth() < dob.getMonth() || (currentDate.getMonth() === dob.getMonth() && currentDate.getDate() < dob.getDate())) {
      return age--;
    } else {
      return age;
    }
  }else{
      return false;
  }
}

export const setJson = (data) => JSON.stringify(data);
export const getJson = (json) => JSON.parse(json);
