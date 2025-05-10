import { Router } from "express";
import { HTTP_BAD_REQUEST, HTTP_OK } from "../configs/http_status";
const router = Router();

import { Person, PersonModel } from "../models/person.model";

const environment = "- FamilyTree: ";

// Get all persons
router.get("/", async (req, res) => {
  const people = await PersonModel.find();
  res.json(people);
});

// Add new person
router.post("/add-person", async (req, res) => {
  try {
    const newPerson: Person = {
      name: req.body.name,
      surname: req.body.surname,
      gender: req.body.gender,
      dateOfBirth: new Date(req.body.dateOfBirth),
    };

    const createdPerson = await PersonModel.create(newPerson);
    console.log(environment + "Person Created:", createdPerson);
    res.status(HTTP_OK).send("Person created");
  } catch (error) {
    console.error(error);
    res.status(HTTP_BAD_REQUEST).send("Error creating person.");
  }
});

// Add relationship
router.put("/add-relation/:id", async (req, res) => {
  try {
    const person = await PersonModel.findById(req.params.id);
    const { relationType, relatedPersonId } = req.body;

    if (!person) {
      return res.status(HTTP_BAD_REQUEST).send("Person not found");
    }

    if (person._id.toString() === relatedPersonId) {
      return res.status(HTTP_BAD_REQUEST).send("A person cannot be related to themselves.");
    }

    const relatedPerson = await PersonModel.findById(relatedPersonId);
    if (!relatedPerson) {
      return res.status(HTTP_BAD_REQUEST).send("Related person not found");
    }

    // Ensure relations object exists
    if (!person.relations) {
      person.relations = { father: null, mother: null, children: [], siblings: [] };
    }

    if (!relatedPerson.relations) {
      relatedPerson.relations = { father: null, mother: null, children: [], siblings: [] };
    }

    // Check for circular relationships
    const personIdStr = person._id.toString();
    const relatedIdStr = relatedPerson._id.toString();

    if (
      (relationType === "father" || relationType === "mother") &&
      relatedPerson.relations.children.includes(personIdStr)
    ) {
      return res.status(HTTP_BAD_REQUEST).send("Circular relationship not allowed.");
    }

    if (
      relationType === "child" &&
      (relatedPerson.relations.father === personIdStr || relatedPerson.relations.mother === personIdStr)
    ) {
      return res.status(HTTP_BAD_REQUEST).send("Circular relationship not allowed.");
    }

    if (
      relationType === "sibling" &&
      (relatedPerson.relations.siblings.includes(personIdStr) ||
        person.relations.siblings.includes(relatedIdStr))
    ) {
      return res.status(HTTP_BAD_REQUEST).send("Siblings already linked.");
    }

    // Relation assignments
    if (relationType === "father" || relationType === "mother") {
      person.relations[relationType as "father" | "mother"] = relatedIdStr;

      if (!relatedPerson.relations.children.includes(personIdStr)) {
        relatedPerson.relations.children.push(personIdStr);
      }

    } else if (relationType === "child") {
      if (!person.relations.children.includes(relatedIdStr)) {
        person.relations.children.push(relatedIdStr);
      }

      if (!relatedPerson.relations.father) {
        relatedPerson.relations.father = personIdStr;
      } else if (!relatedPerson.relations.mother) {
        relatedPerson.relations.mother = personIdStr;
      }

    } else if (relationType === "sibling") {
      if (!person.relations.siblings.includes(relatedIdStr)) {
        person.relations.siblings.push(relatedIdStr);
      }

      if (!relatedPerson.relations.siblings.includes(personIdStr)) {
        relatedPerson.relations.siblings.push(personIdStr);
      }

      // Sync parents
      if (person.relations.father && !relatedPerson.relations.father) {
        relatedPerson.relations.father = person.relations.father;
      } else if (relatedPerson.relations.father && !person.relations.father) {
        person.relations.father = relatedPerson.relations.father;
      }

      if (person.relations.mother && !relatedPerson.relations.mother) {
        relatedPerson.relations.mother = person.relations.mother;
      } else if (relatedPerson.relations.mother && !person.relations.mother) {
        person.relations.mother = relatedPerson.relations.mother;
      }
    }

    await person.save();
    await relatedPerson.save();

    res.json({ updated: true, person, relatedPerson });
  } catch (err) {
    console.error(err);
    res.status(HTTP_BAD_REQUEST).send("Error updating relationship.");
  }
});

export default router;
