import './UI.module.scss'

const Img = ({ src, alt, ...props }) => {
	return <img src={src} alt={alt} {...props} />
}

export default Img
