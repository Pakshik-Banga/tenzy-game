import './App.css'
export default (props)=>{
    let style = {
        backgroundColor : props.held? "#59E391":"rgba(255,255,255)"
    }
    if(props.loose){
          style = {
            backgroundColor : "red"
          }
    }
    return <div className='box' 
    style={style}
        onClick={props.click}
    >
            <p>{props.num}</p>
    </div>
}