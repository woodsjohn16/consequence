import React from 'react'
import Image from 'next/image'

import loader from '../../assets/images/loader.svg'

const Loading = () => {
    return(
        <Image src={loader} />
    )
}

export default Loading;