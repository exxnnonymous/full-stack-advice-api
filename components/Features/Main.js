

import { Container, Title } from '@mantine/core'
import React from 'react'
import FeaturesItems from './FeaturesItem'
import styles from '@/styles/Features.module.css'

function FeaturesMain() {
  return (
    <Container size="xl" className={styles.container}>
        <Title className={styles.title} pb={25}>Features</Title>
        <FeaturesItems />
    </Container>
  )
}

export default FeaturesMain