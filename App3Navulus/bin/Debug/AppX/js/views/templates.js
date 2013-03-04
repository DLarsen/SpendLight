var templates = templates || {};

templates.venueListItemTemplate = _.template(
    '<div class="box-box venue" style="background-image: url(\'<%=img_url%>\');"><div class="name <%=nameClass %>"><%=name %></div><div class="target">$<%=target %> ALLOWED</div></div>' +
    '<div class="box-box box-box-week pastWeek"></div>' +
    '<div class="box-box box-box-week thisWeek box-box-this"></div>' +
    '<div class="box-box box-box-week nextWeek"></div><div class="clear"></div>');
//'<div class="box-box pastWeek"><div class="spent-amount"><%=pastWeek.spent %></div><div class="spent-label">Spent</div><div class="delta"><div class="delta-label"><%=pastWeek.deltaLabel %></div></div></div>' +
//'<div class="box-box box-box-this currentWeek"><div class="spent-amount"><%=thisWeek.spent %></div><div class="spent-label">Spent</div><div class="delta"><div class="delta-label"><%=thisWeek.deltaLabel %></div></div></div>' +
//'<div class="box-box nextWeek"><div class="spent-amount"><%=nextWeek.spent %></div><div class="spent-label">Spent</div><div class="delta"><div class="delta-label"><%=nextWeek.deltaLabel %></div></div></div><div style="clear: both;"></div>');

templates.weekTemplate = _.template(
    '<div class="spent-amount"><%=spent %></div><div class="spent-label">Spent</div><div class="delta"><div class="across" style="width: <%=pct %>%;"></div><div class="delta-label"><%=deltaLabel %></div></div>'
);

templates.transListItemTemplate = _.template(
    '<div class="trans-list-item">' +
        '<div class="day"><%=when%></div>' +
        '<div class="amt <%=goodClass%>">$<b><%=spent%></b></div>' +
        '<div class="comments">' +
            '<% if (firstComment != null) { %>' +
                '<div id="comment"><%=firstComment.text %></div>' +
            '<% } else { %> ' +
            '<% } %>' +
        '</div><div class="clear"></div>' +
    '</div>'
    );
// NOT USED
templates.commentItemTemplate = _.template(
    '<div class="trans-list-item"><div class="day"><%=when%></div><div class="amt <%=goodClass%>">$<b><%=spent%></b></div><div class="comments"></div><div class="clear"></div></div>'
    );