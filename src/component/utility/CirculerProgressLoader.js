import dashboard from '../style/dashboard/CustomerDashboard.module.css';
import CircularProgress from './CirculerProgress';
const CirculerProgressLoader = () => {
    return (
        <div class={[dashboard['card--loading'], dashboard['']].join(' ')}>
        <div class={dashboard['card_body']}>
        
          <div class={dashboard['card_button_and_icon']}>
        
     
        
           
        
        
          </div>
        
        
        
          <CircularProgress/>
         
        </div>
        <div  class={dashboard['card_footer']}>loading...</div>
          
        </div>

    );
}
export default CirculerProgressLoader;