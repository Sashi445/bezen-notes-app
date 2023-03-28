const Icon = ({ src, alt }) => {
    return (<div className="cursor-pointer" style={{ height: '20px', width: '20px' }}  >
        <img className="h-full w-full" src={src} alt={alt} />
    </div>);
}

export default Icon;