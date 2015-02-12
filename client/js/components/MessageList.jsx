define([
	"react"
], function ( React ) {
	var classSet = React.addons.classSet;
	return React.createClass({
		displayName: "MessageList",
		getDefaultProps: function () {
			return {
				currentMessageId: null,
				messages: [],
				loading: false
			};
		},
		onClick: function ( id, e ){
			e.preventDefault();
			this.props.onSelectMessage( id );
		},
		renderMessages: function () {
			return this.props.messages.map( function ( message ) {
				var text = message.body.length > 50 ? message.body.substr(0,50) + "..." : message.body;
				var classes = classSet({
					"list-group-item": true,
					"active": message.id === this.props.currentMessageId
				});
				return <a key={"message-" + message.id}
						  href={"/message/" + message.id }
						  onClick={this.onClick.bind( this, message.id)}
						  className={classes}>
						<h4 className="list-group-item-heading">
							{ message.hasRead ? null : <i className="unreadIcon fa fa-circle"></i> } {message.subject}
						</h4>
						<p className="list-group-item-text">{text}</p>
					</a>;
			}, this	);
		},
		render: function () {
			return (
				<div className="list-group">
					{ this.renderMessages() }
				</div>
			);
		}
	});
});
