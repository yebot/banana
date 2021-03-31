const { Note } = require('../models/bananaModels');

const noteController = {};

noteController.getNotes = (req, res, next) => {

  next();
}

noteController.createNote = (req, res, next) => {
  const newNote = { 
    content: req.body.content, 
    title: req.body.title, 
    author_id: req.body.author_id, 
    tags: req.body.tags
  };
  const note = new Note(newNote);
  note.save()
    .then(data => {
      res.locals = data;
      next();
    })
    .catch(err => {
      console.log(err);
      next({
        log: `Unable to save new note - ${err}`,
        status: 500,
        message: { err: 'Unable to save new note' },
      });
    });
}

noteController.updateNote = (req, res, next) => {
  const noteId = req.params.id.toString();
  const updatedNote = { 
    content: req.body.content, 
    title: req.body.title, 
    author_id: req.body.author_id, 
    tags: req.body.tags
  };
  //console.log(updatedNote);
  Note.findByIdAndUpdate( noteId, updatedNote, (err, data) => {
    console.log(data);
    if (!err) {
      res.locals = data;
      next();
    } else {
      next({err});
    }
  });

}

noteController.deleteNote = (req, res, next) => {
  const noteId = req.params.id.toString();
  Note.deleteOne({ _id: noteId}, (err, result) => {
    console.log(result);
    if (!err && result.deletedCount === 1) {
      console.log(`deleted note _id=${noteId}`);
      next();
    } else {
      next({ log: err, message: { err: err } });
    }
  })
}

module.exports = noteController;