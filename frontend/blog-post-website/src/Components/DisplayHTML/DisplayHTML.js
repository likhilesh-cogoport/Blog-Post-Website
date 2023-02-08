import React from 'react'

const DisplayHTML = (props) => <div>
    { <div dangerouslySetInnerHTML={{ __html: props.html }} /> }
    </div>;
// export default DisplayHTML = (props) => <div>{props.html}</div>;
export default DisplayHTML;