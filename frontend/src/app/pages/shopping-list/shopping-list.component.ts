import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss'],
})
export class ShoppingListComponent implements OnInit {
  createListForm: FormGroup;
  createItemForm: FormGroup;
  creatingList: boolean = false;
  categories: { name: string; id: string }[] = [
    { name: 'Alacena', id: '1' },
    { name: 'Limpieza', id: '2' },
    { name: 'Frutas y Verduras', id: '3' },
  ];
  currentList: {
    id: number;
    name: string;
    participants: string[];
    items: { id: number; name: string; category: string; quantity: number }[];
  } = {
    id: 1,
    name: 'Pau & Tiago',
    participants: ['12345', '32123'],
    items: [
      { id: 1, name: 'Pan', category: 'Alacena', quantity: 1 },
      { id: 2, name: 'Lavandina', category: 'Limpieza', quantity: 2 },
      { id: 3, name: 'Arroz', category: 'Alacena', quantity: 5 },
      { id: 4, name: 'Papas', category: 'Frutas y Verduras', quantity: 5 },
    ],
  };

  shoppingLists = [
    {
      id: 1,
      name: 'Pau & Tiago',
      participants: ['12345', '32123'],
      items: [
        { id: 1, name: 'Pan', category: 'Alacena', quantity: 1 },
        { id: 2, name: 'Lavandina', category: 'Limpieza', quantity: 2 },
        { id: 3, name: 'Arroz', category: 'Alacena', quantity: 5 },
      ],
    },
    {
      id: 2,
      name: 'Mi Lista de compras',
      participants: ['54321'],
      items: [
        { id: 1, name: 'Leche', category: 'Lácteos', quantity: 3 },
        { id: 2, name: 'Jabón', category: 'Higiene', quantity: 4 },
        { id: 3, name: 'Queso', category: 'Lácteos', quantity: 2 },
        { id: 4, name: 'Shampoo', category: 'Higiene', quantity: 3 },
      ],
    },
    {
      id: 3,
      name: 'Depto Anashe',
      participants: ['67890', '09876', '11223'],
      items: [
        { id: 1, name: 'Arroz', category: 'Alacena', quantity: 5 },
        { id: 2, name: 'Detergente', category: 'Limpieza', quantity: 1 },
        { id: 3, name: 'Pasta', category: 'Alacena', quantity: 4 },
        { id: 4, name: 'Cloro', category: 'Limpieza', quantity: 2 },
        { id: 5, name: 'Yogurt', category: 'Lácteos', quantity: 6 },
      ],
    },
    {
      id: 4,
      name: 'Buscando Money',
      participants: ['44556', '77889', '99000', '33445'],
      items: [
        { id: 1, name: 'Queso', category: 'Lácteos', quantity: 2 },
        { id: 2, name: 'Shampoo', category: 'Higiene', quantity: 3 },
        { id: 3, name: 'Papel Higiénico', category: 'Higiene', quantity: 12 },
      ],
    },
    {
      id: 5,
      name: 'Shopping List 5',
      participants: ['66778'],
      items: [],
    },
    {
      id: 6,
      name: 'Colonizando Andorra',
      participants: ['99887', '77665', '55443', '22110', '33445', '66778'],
      items: [
        { id: 1, name: 'Frijoles', category: 'Alacena', quantity: 3 },
        { id: 2, name: 'Limpiador', category: 'Limpieza', quantity: 1 },
        { id: 3, name: 'Mantequilla', category: 'Lácteos', quantity: 2 },
        { id: 4, name: 'Gel de Baño', category: 'Higiene', quantity: 2 },
        { id: 5, name: 'Pan', category: 'Alacena', quantity: 1 },
        { id: 6, name: 'Lavandina', category: 'Limpieza', quantity: 2 },
        { id: 7, name: 'Arroz', category: 'Alacena', quantity: 5 },
        { id: 8, name: 'Detergente', category: 'Limpieza', quantity: 1 },
        { id: 9, name: 'Pasta', category: 'Alacena', quantity: 4 },
        { id: 10, name: 'Cloro', category: 'Limpieza', quantity: 2 },
        { id: 11, name: 'Yogurt', category: 'Lácteos', quantity: 6 },
        { id: 12, name: 'Papel Higiénico', category: 'Higiene', quantity: 12 },
      ],
    },
    {
      id: 7,
      name: 'Shopping List 7',
      participants: ['99887', '77665'],
      items: [
        { id: 1, name: 'Frijoles', category: 'Alacena', quantity: 3 },
        { id: 2, name: 'Limpiador', category: 'Limpieza', quantity: 1 },
      ],
    },
    {
      id: 8,
      name: 'Shopping List 8',
      participants: ['55443', '22110'],
      items: [
        { id: 1, name: 'Mantequilla', category: 'Lácteos', quantity: 2 },
        { id: 2, name: 'Gel de Baño', category: 'Higiene', quantity: 2 },
      ],
    },
  ].sort((a, b) => b.participants.length - a.participants.length);

  constructor(private fb: FormBuilder) {
    this.createListForm = this.fb.group({
      // Obligatory
      name: ['', [Validators.required]],
    });
    this.createItemForm = this.fb.group({
      // Obligatory
      name: ['', [Validators.required]],
      category: ['', [Validators.required]],
      id: ['', [Validators.required]],
    });
  }

  ngOnInit() {}

  enableListCreation() {
    this.creatingList = true;
  }

  submitListForm() {
    this.creatingList = false;
    console.log(this.createListForm.value);
    this.shoppingLists.push({
      id: this.shoppingLists.length + 1,
      name: this.createListForm.value.name,
      participants: ['55443'],
      items: [],
    });
    this.createListForm.reset();
  }
  submitCategoryForm() {
    const aux = this.categories.find(
      (element) => element.id === this.createItemForm.value.category
    );

    if (!aux) return;
    this.createItemForm.value.category = aux.name;
    this.createItemForm.value.id = aux.id;

    this.currentList.items.push(this.createItemForm.value);

    this.createItemForm.reset();
  }
}
