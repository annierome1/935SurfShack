// components/MenuCard.js
// A card component to display individual menu items with a coastal, clean vibe.

const MenuCard = ({ title, description, price, imageUrl }) => {
    return (
      <div style={cardStyle}>
        {imageUrl && (
          <img src={imageUrl} alt={title} style={imageStyle} />
        )}
        <div style={cardContentStyle}>
          <h3 style={titleStyle}>{title}</h3>
          <p style={descriptionStyle}>{description}</p>
          <p style={priceStyle}>${price}</p>
        </div>
      </div>
    );
  };
  
  const cardStyle = {
    border: 'none',
    borderRadius: '10px',
    overflow: 'hidden',
    marginBottom: '20px',
    maxWidth: '300px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', 
    backgroundColor: '#fffaf3', 
  };
  
  const imageStyle = {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
  };
  
  const cardContentStyle = {
    padding: '15px',
  };
  
  const titleStyle = {
    margin: '0 0 10px 0',
    fontFamily: "'Montserrat', sans-serif", 
    color: '#2a4d69', 
  };
  
  const descriptionStyle = {
    margin: '0',
    fontFamily: "'Open Sans', sans-serif", // Clean, readable body text
    color: '#333',
  };
  
  const priceStyle = {
    fontWeight: 'bold',
    marginTop: '10px',
    fontFamily: "'Montserrat', sans-serif",
    color: '#2a4d69',
  };
  
  export default MenuCard;
  