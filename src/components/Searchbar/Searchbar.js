import React from 'react';
import { InputGroup, InputLeftElement, Input, Icon } from "@chakra-ui/core";

function Searchbar() {
  return (
    <InputGroup>
      <InputLeftElement children={<Icon name="search" color="gray.300" />} />
      <Input type="search" placeholder="Search..." size="lg" border="0" />
    </InputGroup>
  )
}

export default Searchbar;
