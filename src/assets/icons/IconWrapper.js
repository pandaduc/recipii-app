import styled from '@emotion/styled'

const IconWrapper = styled.span`
  display: inline-block;
  
  > svg {
    width: ${props => props.size || '24px'};
    height: ${props => props.size || '24px'};
  }
`;

export default IconWrapper;
