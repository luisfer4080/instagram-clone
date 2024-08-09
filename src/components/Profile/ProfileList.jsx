
export default function ProfileList({profile}){

    return(
        <ul className="profile__list">
            <li>
                <span className="profile__list__span">
                    <span className="profile__list__numbers">{profile && profile.posts.length}</span>
                </span>
                <span> posts</span>
            </li>
            <li>
                <a href="#" className="profile__list__link" role="link" tabIndex="0">
                    <span className="profile__list__span">
                        <span className="profile__list__numbers">{profile && profile.followers.length}</span>
                    </span>
                    <span> followers</span>
                </a>
            </li>
            <li>
                <a href="#" className="profile__list__link" role="link" tabIndex="0">
                    <span className="profile__list__span">
                        <span className="profile__list__numbers">{profile && profile.following.length}</span>
                    </span>
                    <span> following</span>
                </a>
            </li>
        </ul>
    )
}