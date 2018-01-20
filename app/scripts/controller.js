(function (ng) {
    'use strict';

    ng.module('phoneBook')
        .controller('phoneBookCtrl', PhoneBookCtrl);

    PhoneBookCtrl.$inject = ['$scope', '$http'];

    function PhoneBookCtrl($scope, $http) {
        this.contactList = ng.fromJson(localStorage.contacts);

        if (!this.contactList) {
            this.contactList = [{
                id: 1,
                username: 'Максим',
                workPlace: 'Завод',
                mobileNumber: 89201101110,
                email: 'gibrid@mail.ru'
            },
            {
                id: 2,
                username: 'Генадий',
                workPlace: 'Магазин',
                mobileNumber: 89301102110,
                email: 'test@mail.ru'
            }];
        }

        this.currentContact = this.contactList[0];
    }

    PhoneBookCtrl.prototype = {
        constructor: PhoneBookCtrl,
        addContact: function (form) {
            var lastElement = this.contactList[this.contactList.length - 1];
            this.currentContact.id = lastElement.id + 1;
            this.contactList.push(this.currentContact);
            this.isEdit = false;
            this.isAdd = false;
        },
        removeContact: function (contact) {
            this.contactList.splice(this.contactList.indexOf(contact), 1);
            this.currentContact = this.contactList[0];
        },
        viewContact: function (contact) {
            this.isEdit = false;
            this.isAdd = false;

            this.currentContact = Object.assign({}, contact);
        },
        newContact: function () {
            this.isEdit = true;
            this.isAdd = true;

            this.currentContact = null;
        },
        editContact: function () {
            this.isEdit = true;
        },
        saveContact: function () {
            var self = this;
            this.contactList = this.contactList.map(function (c) {
                if (c.id === self.currentContact.id) {
                    return self.currentContact;
                } else {
                    return c;
                }
            });


            this.isEdit = false;
        }

    }

})(angular);


