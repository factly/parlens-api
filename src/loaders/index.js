import batchMembers from './members';
import batchParties from './parties';
import batchGeographies from './geographies';
import batchHouses from './houses';
import batchMinistries from './ministries';
import DataLoader from 'dataloader';

export default class loaders {
    constructor(context){
        this._context = context;
    }

    get(){
        return {
            members: new DataLoader(async keys => batchMembers(keys, this._context)),
            parties: new DataLoader(async keys => batchParties(keys, this._context)),
            geographies: new DataLoader(async keys => batchGeographies(keys, this._context)),
            houses: new DataLoader(async keys => batchHouses(keys, this._context)),
            ministries: new DataLoader(async keys => batchMinistries(keys, this._context)),
        };
    }
}

