var mongoose = require('mongoose'),
      bcrypt = require("bcryptjs"),
      Schema = mongoose.Schema;

var CompetitionSchema = new Schema({
    createdAt       : { type: Date }
  , updatedAt       : { type: Date }
  , title           : { type: String, unique: true, required: true }
  , grade          : { type: String, required: false }
  , questionCount   : { type: Number, required: true },
  user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
  }
});

CompetitionSchema.pre('save', function(next){
    // SET createdAt AND updatedAt
    var now = new Date();
    this.updatedAt = now;
    if ( !this.createdAt ) {
      this.createdAt = now;
    };
    next();
  });

  module.exports = mongoose.model('Competition', CompetitionSchema);
