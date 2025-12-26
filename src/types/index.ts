export interface LinkItem {
    id: string;
    title: string;
    url: string;
    type: string;
    isVisible?: boolean;
    autoplay?: boolean;
}

export interface Story {
    id: string;
    imageUrl: string;
    createdAt: string;
}

export interface Place {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    locationLink: string;
    rating?: number;
}

export interface Profile {
    themeId?: string;
    buttonShape?: string;
    image?: string;
    name?: string;
    username?: string;
    bio?: string;
    customBackground?: string;
    fontColor?: string;
    fontFamily?: string;
    email?: string;
}
