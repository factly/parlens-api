import members from '../../models/parties';
module.exports = {
	index() {
		return members.find({})
	},
};