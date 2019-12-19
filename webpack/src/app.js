import React, { Component, useState } from 'react'
function DemoFunc() {
    const [data, setData] = useState(1);
    setTimeout(() => {
        setData(3);
    }, 1000)
    return <div>{data}</div>
}
class Demo extends Component {
    render () {
        return (
            <div>
                <DemoFunc />
            </div>
        )
    }
}
export default Demo
