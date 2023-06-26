export  interface CatModel{
  id: string,
  url: string,
  width: number,
  height: number,
  mime_type: string,
  breeds: [],
  categories: [],
  breed_ids: string
}

export interface BreedModel {
  id: string,
  name: string
}
