import parties from '../../models/parties';
module.exports = {
	index() {
		return parties.find()
	},
};