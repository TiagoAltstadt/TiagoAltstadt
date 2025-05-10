import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FAMILY_TREE_URL } from '../shared/constants/urls';

@Injectable({
  providedIn: 'root'
})
export class FamilyTreeService {

  constructor(private http: HttpClient) {}
  
  // Fetch all people (for visualization later)
  getAllPeople(): Observable<any> {
    return this.http.get(FAMILY_TREE_URL + `/`);
    
  }

  // Add a new person
  addPerson(person: { name: string, surname: string, dateOfBirth: string }): Observable<any> {
    return this.http.post(FAMILY_TREE_URL + `/add-person`, person);
  }

  // Add a relationship
  addRelation(personId: string, relationType: string, relatedPersonId: string): Observable<any> {
    return this.http.put(FAMILY_TREE_URL + `/add-relation/${personId}`, {
      relationType,
      relatedPersonId
    });
  }

}
