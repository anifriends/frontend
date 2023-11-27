import axiosInstance from 'shared/apis/axiosInstance';

type PageInfo = {
  totalElements: number;
  hasNext: boolean;
};

type Animal = {
  animalId: number;
  animalName: string;
  shelterName: string;
  shelterAddress: string;
  animalImage: string;
};

export const searchVolunteerAnimals = () =>
  axiosInstance.get<
    {
      pageInfo: PageInfo;
      animals: Animal[];
    },
    {
      type: string;
      gender: string;
      isNeutered: boolean;
      active: string;
      size: string;
      age: string;
      pageNumber: number;
      pageSize: number;
    }
  >('/volunteers/animals');

type Shelter = {
  shelterId: number;
  name: string;
  imageUrl: string;
  email: string;
  address: string;
};

export const getVolunteerAnimalDetail = (animalId: number) => {
  return axiosInstance.get<{
    name: string;
    birthDate: string;
    breed: string;
    gender: string;
    isNeutered: boolean;
    active: string;
    weight: number;
    information: string;
    animalImageUrls: string[];
    shelter: Shelter;
  }>(`/volunteers/animals/${animalId}`);
};
