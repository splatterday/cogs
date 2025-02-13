export type UserData = {
  in_wantlist?: boolean;
  in_collection?: boolean;
};

export type Community = {
  want?: number;
  have?: number;
};

export type BaseDiscogsItem = {
  id?: number;
  type?: string;
  user_data?: UserData;
  master_id?: number;
  master_url?: string;
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
  formats?: string[];
}

export interface Artist extends BaseDiscogsItem {}

export interface DiscogsCollectionItem {
  id?: number;
  basic_information?: Album;
}

export type DiscogsSearchResponse = Album | Artist;

export interface DiscogsCollectionResponse {
  albums?: Album[];
}
