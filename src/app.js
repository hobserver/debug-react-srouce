const React = require('react');
const { Component, useState } = React;
function DemoFunc() {
    debugger
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
