var mongoose = require('mongoose'),
      bcrypt = require("bcryptjs"),
      Schema = mongoose.Schema;

var ProblemSchema = new Schema({
    createdAt       : { type: Date }
  , updatedAt       : { type: Date }
  , description     : { type: String, required: true }
  , grade           : { type: String, required: false }
  , topic           : {type: String, required: true}
  , questionCount   : { type: Number, required: true },
  user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
  }
});

ProblemSchema.pre('save', function(next){
    // SET createdAt AND updatedAt
    var now = new Date();
    this.updatedAt = now;
    if ( !this.createdAt ) {
      this.createdAt = now;
    };
    next();
  });

  module.exports = mongoose.model('Problem', ProblemSchema);
