import { Token } from "./token.model";
import { IToken } from "../../../utils";
import { AbstractRepository } from "../../abstract.repository";

export class TokenRepository extends AbstractRepository<IToken> {
    
    constructor() {
        super(Token);
    }
}
    
