import Carousel from './Carousel';
import FeedPosts from './FeedPosts';

export default function Feed({userData}){

    return(
        <main className="feed__container">
            <div className='feed__contianer__margin'>
                <Carousel following={userData?.following}/>
                <FeedPosts />
            </div>
        </main>    
    )

}
