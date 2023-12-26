
import { Button, Modal, Form } from "react-bootstrap";

import { useState } from "react"
import IExpenseItem, { IExpenseCreateItem } from "../models/expense";

import { getAllPayeeNames } from "../services/expense-utils";

import { FormEvent, useRef } from "react"

import { createNewExpenseItem } from "../services/expense-service";


// Addition of local type to receive the prop 'expenseItems'
// Add a dynamic block for Form.Select - call getAllPayeeNames()

type ExpenseCreatorModel = {

  expenseItems: IExpenseItem[];
  refresh: (newExpenseItem: IExpenseItem) => void
}

const ExpenseCreator = ({ expenseItems, refresh }: ExpenseCreatorModel) => {
  const [validated, setValidated] = useState(false);
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    setValidated(false);
  }
  const handleShow = () => setShow(true);

  const expenseDescriptionRef = useRef<HTMLInputElement>(null);
  const payeeNameRef = useRef<HTMLSelectElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);
  const expenseDateRef = useRef<HTMLInputElement>(null);

  // Add support for onSubmit
  // handleFormSubmission / handleNewExpense
  // Usage of useRef hooks [4]
  // Implementation of handleNewExpense -> 
  // print to console
  // Final line of code - handleClose

  const handleExpenseCreate = async (event: FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);

    const expenseDescription = (expenseDescriptionRef?.current?.value as string)

    const payeeName = (payeeNameRef?.current?.value as string)

    const price = parseFloat((priceRef?.current?.value as string));

    const pickedUpDate = expenseDateRef?.current?.value;

    const expenseDate = new Date((expenseDateRef?.current?.value as string));

    if (typeof expenseDescription === "string" && expenseDescription.trim().length == 0) {
      return;
    }

    if (typeof payeeName === 'string' && payeeName.trim().length === 0) {
      return;
    }

    if (typeof price === 'number' && Number.isNaN(price)) {
      return;
    }

    if (typeof pickedUpDate === 'string' && pickedUpDate.trim().length === 0) {
      return;
    }

    const newExpenseItemObj: IExpenseCreateItem = {
      expenseDescription: expenseDescription,
      payeeName: payeeName,
      price: price,
      date: expenseDate
    }

    const response = await createNewExpenseItem(newExpenseItemObj)
    refresh(response)
    console.log("Response is");
    console.log(response);
    handleClose();
  }

  const createExpenseModalBody = () => {




    return (

      <Form noValidate validated={validated} onSubmit={handleExpenseCreate}>

        <Form.Group className="mb-3" controlId="expenseDescription">
          <Form.Label>Expense Description</Form.Label>
          <Form.Control type="text" placeholder="Enter expense description" ref={expenseDescriptionRef} required />
          <Form.Control.Feedback type="invalid">Please provide expense description.</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="payeeName">
          <Form.Label>Payee Name</Form.Label>

          <Form.Select aria-label="Default select example" ref={payeeNameRef} required>
            <option value="">SELECT A PAYEE</option>
            {
              getAllPayeeNames(expenseItems).map((payeeName) => {

                return (
                  <option value={payeeName}>{payeeName}</option>
                )
              })
            }
          </Form.Select>
          <Form.Control.Feedback type="invalid">Please provide payee name.</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="price">
          <Form.Label>Price</Form.Label>
          <Form.Control type="number" placeholder="Enter expense price" ref={priceRef} required />
          <Form.Control.Feedback type="invalid">Please provide expense price.</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="expenseDate">
          <Form.Label>Expense Date</Form.Label>
          <Form.Control type="date" ref={expenseDateRef} required />
          <Form.Control.Feedback type="invalid">Please provide expense date.</Form.Control.Feedback>
        </Form.Group>

        <Button variant="primary" type="submit">
          New Expense
        </Button>

        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Form>
    )
  }

  return (
    <div>

      <Button variant="primary" onClick={handleShow}>
        New Expense Item
      </Button>

      <Modal show={show} onHide={handleClose}>

        <Modal.Header closeButton>
          <Modal.Title>New Expense</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {createExpenseModalBody()}
        </Modal.Body>

      </Modal>
    </div>
  )
}

export { ExpenseCreator }