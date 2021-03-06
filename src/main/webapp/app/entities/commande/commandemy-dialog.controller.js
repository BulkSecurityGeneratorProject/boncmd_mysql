(function() {
    'use strict';

    angular
        .module('boncmd6App')
        .controller('CommandeMyDialogController', CommandeMyDialogController);

    CommandeMyDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Commande', 'Produit'];

    function CommandeMyDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Commande, Produit) {
        var vm = this;

        vm.commande = entity;
        vm.clear = clear;
        vm.datePickerOpenStatus = {};
        vm.openCalendar = openCalendar;
        vm.save = save;
        vm.produits = Produit.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.commande.id !== null) {
                Commande.update(vm.commande, onSaveSuccess, onSaveError);
            } else {
                Commande.save(vm.commande, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('boncmd6App:commandeUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }

        vm.datePickerOpenStatus.dateCommande = false;

        function openCalendar (date) {
            vm.datePickerOpenStatus[date] = true;
        }
    }
})();
