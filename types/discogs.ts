export type UserData = {
  in_wantlist?: boolean;
  in_collection?: boolean;
};

export type Community = {
  want?: number;
  have?: number;
};

export type Formats = {
  descriptions?: string[];
  name?: string;
  qty?: number;
  text?: string;
}

export type BaseDiscogsItem = {
  id?: number;
  type?: "album" | "artist" | "master";
  user_data?: UserData;
  master_id?: number | null;
  master_url?: string | null;
  uri?: string;
  title?: string;
  thumb?: string;
  cover_image?: string;
  resource_url?: string;
};

export interface Album extends BaseDiscogsItem {
  country?: string;
  year?: string;
  format?: string[];
  label?: string[];
  genre?: string[];
  style?: string[];
  barcode?: string[];
  catno?: string;
  community?: Community;
  format_quantity?: number;
  formats?: Formats[];
}

export interface Master extends BaseDiscogsItem {
  year?: string;
  genre?: string[];
  style?: string[];
  cover_image?: string;
  format?: string[];
}

export interface Artist extends BaseDiscogsItem {
  master_id?: null; // Artists do not have a master_id
  master_url?: null;
}

export interface DiscogsCollectionItem {
  id?: number;
  basic_information?: Album;
}

export type DiscogsSearchResponse = Album | Artist | Master;

export interface DiscogsCollectionResponse {
  albums?: Album[];
}
