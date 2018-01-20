(function (ng) {
    'use strict';

    ng.module('phoneBook')
        .controller('phoneBookCtrl', PhoneBookCtrl);

    PhoneBookCtrl.$inject = ['$scope', '$http'];

    function PhoneBookCtrl($scope, $http) {
        this.$scope = $scope;
        this.contactList = [{
            id: 1,
            username: 'Максим',
            workPlace: 'Завод',
            mobileNumber: 89201101110,
            email: 'gibrid@mail.ru',
            image: 'http://www.uni-regensburg.de/Fakultaeten/phil_Fak_II/Psychologie/Psy_II/beautycheck/english/durchschnittsgesichter/m(01-32)_gr.jpg'
        },
        {
            id: 2,
            username: 'Генадий',
            workPlace: 'Магазин',
            mobileNumber: 89301102110,
            email: 'test@mail.ru',
            image: 'https://www.taylorherring.com/blog/wp-content/uploads/2015/03/Archetypal-Male-Face-of-Beauty-embargoed-to-00.01hrs-30.03.15.jpg'
        }];

        this.currentContact = this.contactList[0];
    }

    PhoneBookCtrl.prototype = {
        constructor: PhoneBookCtrl,
        addContact: function (form) {
            var lastElement = this.contactList[this.contactList.length - 1];
            if (lastElement) {
                this.currentContact.id = lastElement.id + 1;
            } else {
                this.currentContact.id = 1;
            }
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

            this.currentContact = {};
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
        },
        imageChange: function (files) {
            var self = this;
            var file = files[0];
            if (!(/\.(gif|jpg|png)$/i).test(file.name)) {
                alert('Неверный формат');
                return;
            }
            var reader = new FileReader();
            reader.onload = function(e){
                self.$scope.$apply(function(){
                    self.currentContact.image = e.target.result;
                })
                
            };
            reader.readAsDataURL(file);
        }

    }

})(angular);


