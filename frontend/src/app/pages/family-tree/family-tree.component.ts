import { Component, OnInit } from '@angular/core';
import { FamilyTreeService } from 'src/app/services/familyTree.service';
import FamilyTree from '@balkangraph/familytree.js';

@Component({
  selector: 'app-family-tree',
  templateUrl: './family-tree.component.html',
  styleUrls: ['./family-tree.component.scss'],
})
export class FamilyTreeComponent implements OnInit {
  person = { name: '', surname: '', dateOfBirth: '', gender: '' };
  personId = '';
  relationType = '';
  relatedPersonId = '';

  constructor(private familyTreeService: FamilyTreeService) {}

  ngOnInit(): void {
    const treeContainer = document.getElementById('tree');
    // Define custom template
    FamilyTree.templates['myTemplate'] = Object.assign(
      {},
      FamilyTree.templates['base'],
      {
        size: [200, 200],
        node: '<circle cx="100" cy="100" r="100" fill="#4D4D4D" stroke-width="1" stroke="#aeaeae"></circle>',
        field_0:
          '<text style="font-size: 24px;" fill="#ffffff" x="100" y="90" text-anchor="middle">{val}</text>',
        field_1:
          '<text style="font-size: 24px;" fill="#ffffff" x="100" y="120" text-anchor="middle">{val}</text>',
        defs: '',
      }
    );
    FamilyTree.templates['myTemplate_male'] = Object.assign(
      {},
      FamilyTree.templates['myTemplate'],
      {
        node: `<circle cx="100" cy="100" r="100" fill="#039be5" stroke-width="1" stroke="#aeaeae"></circle>`,
      }
    );

    FamilyTree.templates['myTemplate_female'] = Object.assign(
      {},
      FamilyTree.templates['myTemplate'],
      {
        node: `<circle cx="100" cy="100" r="100" fill="#FF46A3" stroke-width="1" stroke="#aeaeae"></circle>`,
      }
    );

    if (treeContainer) {
      // Fetch data from the database
      this.familyTreeService.getAllPeople().subscribe({
        next: (data) => {
          const nodes = this.transformToFamilyTree(data);

          new FamilyTree(treeContainer, {
            mouseScrool: FamilyTree.action.none,
            orientation: FamilyTree.orientation.top,
            enableSearch: false,
            nodeBinding: {
              field_0: 'name',
              field_1: 'surname',
              field_2: 'gender',
            },
            nodes: nodes,
          });
        },
        error: (error) => {
          console.error('Failed to load family tree data:', error);
        },
      });
    }
  }

  onLinkRelation() {
    this.familyTreeService
      .addRelation(this.personId, this.relationType, this.relatedPersonId)
      .subscribe({
        next: () => {
          alert('Relationship updated successfully!');
          this.personId = '';
          this.relationType = '';
          this.relatedPersonId = '';
        },
        error: (error) => {
          console.error('Error:', error);
          alert('Failed to update relationship.');
        },
      });
  }

  private transformToFamilyTree(data: any[]): any[] {
    return data.map((person) => {
      const fid = person.relations?.father ?? null;  // Father ID
      const mid = person.relations?.mother ?? null;  // Mother ID
  
      // Log the relationships to check if they are correct
      console.log({
        id: person._id.toString(),
        fid: fid ? fid.toString() : undefined, // Ensure fid and mid are assigned properly
        mid: mid ? mid.toString() : undefined, 
        name: person.name,
        surname: person.surname,
        gender: person.gender,
      });
  
      // Return the node structure with the relationships properly assigned
      return {
        id: person._id.toString(),
        fid: fid ? fid.toString() : undefined, // Ensure father ID is assigned properly
        mid: mid ? mid.toString() : undefined, // Ensure mother ID is assigned properly
        name: person.name,
        surname: person.surname,
        gender: person.gender,
      };
    });
  }
  
  

  onSubmit() {
    this.familyTreeService.addPerson(this.person).subscribe({
      next: () => {
        alert('Person added successfully!');
        this.person = { name: '', surname: '', dateOfBirth: '', gender: '' };
      },
      error: (error) => {
        console.error('Error:', error);
        alert('Failed to add person.');
      },
    });
  }
}
