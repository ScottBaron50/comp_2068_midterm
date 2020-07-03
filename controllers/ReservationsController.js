// You need to complete this controller with the required 7 actions
/*
    contains the seven required actions (index, show, new, edit, create, update, and delete)
    the index and show actions populate the associated user
    all seven actions function correctly
    appropriate error handling is in place
    flash messages have been implemented
    renders and redirects are used respectively in the correct actions at the correct moments
*/

const viewPath = ('reservations');
const Reservation = require('../models/reservation')

exports.index = async (req, res) => {
    try {
        const reservation = await Reservation
        .find()
        .sort({updatedAt: 'desc'});

        res.render(`${viewPath}/index`, {
            pageTitle: 'Reservations',
            reservation: reservation
        });
    } catch (error) {
        req.flash('danger', `There was an error displaying the reservations: ${error}`);
        res.redirect('/');
    }
};

exports.show = async (req, res) => {
    try {
        const reservation = await Reservation.findById(req.params.id);
        res.render(`${viewPath}/show`, {
            pageTitle: reservation.title,
            reservation: reservation
        });
    } catch (error) {
        req.flash('danger', `There was an error displaying the reservation: ${error}`);
        res.redirect('/');
    }
};

exports.new = (req, res) => {
    res.render(`${viewPath}/new`, {
        pageTitle: 'New Reservation'
    });

};

exports.edit = async (req, res) => {
    try {
        const reservation = await Reservation.findById(req.params.id);
        res.render(`${viewPath}/edit`, {
            pageTitle: reservation.title,
            formData: reservation
        });
    } catch (error) {
        req.flash('danger', `There was an error accessing this reservation: ${error}`);
        res.redirect('/');
    }
};

exports.create = async (req, res) => {
    try {
        const reservation = await Reservation.create(req.body);
        req.flash('success', 'Reservation created successfully');
        res.redirect(`/reservations/${reservation.id}`);
    }   catch (error) {
        req.flash('danger', `There was an error creating this reservation: ${error}`);
        req.session.formData = req.body;
        res.redirect('/reservations/new');
    }
};

exports.update = async (req, res) => {
    try{
        let reservation = await Reservation.findById(req.body.id);
        if (!reservation) throw new Error('Reservation could not be found');

        await Reservation.validate(req.body);
        await Reservation.findByIdAndUpdate(req.body.id, req.body);

        req.flash('success', 'The reservation was updated successfully');
        res.redirect(`/reservations/${req.body.id}`);
    } catch (error) {
        req.flash('danger', `There was an error accessing this reservation: ${error}`);
        res.redirect(`/reservations/${req.body.id}/edit`);
    }
};

exports.delete = async (req, res) => {
    try {
        await Reservation.deleteOne({_id: req.body.id});
        req.flash('success', 'The reservation was deleted successfully');
        res.redirect(`/reservations`);
    } catch (error) {
        req.flash('danger', `There was an error deleting this reservation: ${error}`);
        res.redirect(`/reservations`);
    }
};