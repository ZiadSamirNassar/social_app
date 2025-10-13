import { Model, type RootFilterQuery, type ProjectionType, type QueryOptions, type MongooseUpdateQueryOptions, type UpdateQuery } from "mongoose";

export abstract class AbstractRepository<T> {

    constructor(protected model: Model<T>){}
    
    async create(item: Partial<T>){
        const doc = new this.model(item);
        return await doc.save();
    }

    async update(
        filter: RootFilterQuery<T>, 
        update: UpdateQuery<T>, 
        options?: MongooseUpdateQueryOptions<T>, 
    ){
        return await this.model.updateOne(filter, update, options);
    }

    async delete(filter: RootFilterQuery<T>){
        return await this.model.deleteOne(filter);
    }



    async findOne(
        filter: RootFilterQuery<T>, 
        projection?: ProjectionType<T>, 
        options?: QueryOptions<T>, 
    ){
        return await this.model.findOne(filter, projection, options);
    }

    async exists(
        filter: RootFilterQuery<T>,
        projection?: ProjectionType<T>,
        options?: QueryOptions<T>,
    ){
        return await this.model.findOne(filter, projection, options);
    }
}
