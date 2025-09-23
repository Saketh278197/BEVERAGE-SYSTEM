import '../style/UserDetails.css'
const UserDetails = ({ title, order, onClickCard }) => {
  return (
    <div className="container" >
      <h1>{title}</h1>
      {order.map((o) => (
        <div
          key={o.id}
          className="UserData"
          onClick={() => {
            onClickCard(o);
          }}
        >
          <div className="User">
            <div className="Drink">{o.Drink}</div>
          </div>
          <div className="name">
            <small>{o.name}</small>
          </div>
        </div>
      ))}
    </div>
  );
};
export default UserDetails;