import { PropriedadesImagem } from "./prop_img.model";
import { PropriedadesDog } from "./prop_dog.model";

export class Dog {

    weight: PropriedadesDog;
    height: PropriedadesDog;
    id: number;
    name: string;
    bredFor: string;
    breedGroup: string;
    lifeSpan: string;
    temperament: string;
    origin: string;
    referenceImageId: string;
    image: PropriedadesImagem;
    relatedIds: number[];

    constructor(apiResponse: any) {
        this.weight = apiResponse.weight;
        this.height = apiResponse.height;
        this.id = apiResponse.id;
        this.name = apiResponse.name;
        this.bredFor = apiResponse.bred_for;
        this.breedGroup = apiResponse.breed_group;
        this.lifeSpan = apiResponse.life_span;
        this.temperament = apiResponse.temperament;
        this.origin = apiResponse.origin;
        this.referenceImageId = apiResponse.reference_image_id;
        this.image = apiResponse.image;
        this.relatedIds = apiResponse.relatedIds;
    }
    
}