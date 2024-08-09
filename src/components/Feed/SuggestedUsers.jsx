import useGetSuggestedUsers from "../../hooks/useGetSuggestedUsers";
import SuggestedUser from "./SuggestedUser";

export default function SuggestedUsers(){
    const { isLoading, suggestedUsers } = useGetSuggestedUsers();

    return (
        <div className="footer__sugestions">
            <div className="footer__sugestions__container">
                <div style={{height: "auto", overflow: "hidden auto"}}>
                    <div className="footer__sugestions__flex">
                        {suggestedUsers.map((user) => (
                            <SuggestedUser user={user} key={user.id} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}