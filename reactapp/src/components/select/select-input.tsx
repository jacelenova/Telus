import React, { forwardRef } from 'react';
import { Col, FormGroup, Input, Label, Row } from 'reactstrap';

type SelectInputProps = {
  options: { id: string, name: string }[];
  label: string | null;
}

export const SelectInput = forwardRef<HTMLInputElement, SelectInputProps>(({ options, label }: SelectInputProps, ref) => {
  return (
    <>
      <Row>
        <Col md={6}>
          <FormGroup>
            <Label for="exampleSelect">
              {label}
            </Label>
            <Input
              id="exampleSelect"
              name="select"
              type="select"
              bsSize="sm"
              innerRef={ref}
            >
              {
                options.map(o => {
                  return <option key={o.id} value={o.id}>{o.name}</option>
                })
              }
            </Input>
          </FormGroup>
        </Col>
      </Row>
    </>
  )
})