export const getNationality = (name) => {
  return fetch(`https://api.nationalize.io?name=${name}`)
    .then((response) => response.json())
    .then((data) => {
      return data.country;
    });
};
export const getGender = (name) => {
  return fetch(`https://api.genderize.io?name=${name}`)
    .then((response) => response.json())
    .then((data) => data.gender);
};
export const getAge = (name) => {
  return fetch(`https://api.agify.io?name=${name}`)
    .then((response) => response.json())
    .then((data) => data.age);
};
export const allData = async (name) => {
  const data = {};
  data.nationality = await getNationality(name);
  data.gender = await getGender(name);
  data.age = await getAge(name);
  return data;
};
export const getRandomName = () => {
  return fetch(`https://api.namefake.com`,{ mode: "no-cors", })
  .then(response=>response.text())
    
};
