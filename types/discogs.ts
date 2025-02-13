export type Album = {
  title: string;
  year: number;
  cover_image?: string;
}

export interface DiscogsCollectionItem {
  id: number;
  basic_information: Album;
}

export interface DiscogsCollectionResponse {
  items: DiscogsCollectionItem[];
}
