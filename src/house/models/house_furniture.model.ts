import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript"
import { House } from "./house.model"
import { Furnishing } from "../../furnishing/models/furnishing.model"


interface IHouseFurniture{
    houseId:number
    furnitureId:number
}

@Table({tableName:"house_furniture"})
export class HouseFurniture extends Model<HouseFurniture, IHouseFurniture>{
    @ForeignKey(() => House)
    @Column({
        type:DataType.INTEGER
    })
    houseId:number

    @ForeignKey(() => Furnishing)
    @Column({
        type:DataType.INTEGER
    })
    furnitureId:number
}