import React from 'react'

export default function TopicIcon(props) {
    
    
    const {topicName} = props;
    
    return (
        <div>
            {
                topicName === "Support" ? <div className="row left">
                    <i className="fa fa-phone"></i><div className="support-div">{topicName}</div>
                    </div> : topicName === "General" ? <div className="row left">
                        <i className="fa fa-globe"></i><div className="general-div">{topicName}</div>
                        </div> :
                topicName === "OffTopic" ? <div className="row left">
                    <i className="fa fa-circle-o"></i><div className="offtopic-div">{topicName}</div>
                    </div> : topicName === "News" && <div className="row left">
                        <i className="fa fa-fire"></i><div className="news-div">{topicName}</div>
                        </div>
            }
        </div>
    )
}
