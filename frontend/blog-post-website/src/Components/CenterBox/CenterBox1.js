import React from 'react'
import styles from './styles.module.css'
export default function CenterBox1(props) {
  return (
    <div className={styles.univ}>{
        props.children
    }</div>
  )
}
