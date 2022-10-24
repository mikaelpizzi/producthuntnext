import Head from 'next/head'
import Image from 'next/image'
import styled from '@emotion/styled'

const Heading = styled.h1`
  color: red;
`;

export default function Home() {
  return (
    <div>
      <Heading>Start</Heading>
    </div>
  )
}
