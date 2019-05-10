google.charts.load('current', {'packages':['corechart']});

document.getElementById("trending").onclick = function() {

    const Http = new XMLHttpRequest();
    const url='http://127.0.0.1:5000/dashboard/trending';
    Http.open("GET", url);
    Http.send();
    Http.onreadystatechange=(e)=>{
        var str = Http.responseText;
	var json = JSON.parse(str);
        
	var rows = [];
	var i;
	for (i = 0; i < json.length; i++) {
            row = [json[i].name, json[i].count];
	    rows.push(row);
	}

	var data = new google.visualization.DataTable();
	data.addColumn('string', 'Hashtag');
        data.addColumn('number', 'Count');
        data.addRows(rows);

        var options = {'title':'Trending Topics',
                       'width':800,
                       'height':600};

        var chart = new google.visualization.BarChart(document.getElementById('chart_div'));
        chart.draw(data, options);
    }
}

document.getElementById("postsPerDay").onclick = function() {

    const Http = new XMLHttpRequest();
    const url='http://127.0.0.1:5000/dashboard/daily-posts-count';
    Http.open("GET", url);
    Http.send();
    Http.onreadystatechange=(e)=>{
        var str = Http.responseText;
	var json = JSON.parse(str);
        
	var rows = [];
	var i;
	for (i = 0; i < json.length; i++) {
            row = [json[i].date, json[i].count];
	    rows.push(row);
	}

	var data = new google.visualization.DataTable();
	data.addColumn('string', 'Date');
        data.addColumn('number', 'Count');
        data.addRows(rows);

        var options = {'title':'Number of Posts per Day',
                       'width':800,
                       'height':600};

        var chart = new google.visualization.BarChart(document.getElementById('chart_div'));
        chart.draw(data, options);
    }
}

document.getElementById("repliesPerDay").onclick = function() {

    const Http = new XMLHttpRequest();
    const url='http://127.0.0.1:5000/dashboard/daily-replies';
    Http.open("GET", url);
    Http.send();
    Http.onreadystatechange=(e)=>{
        var str = Http.responseText;
	var json = JSON.parse(str);
        
	var rows = [];
	var i;
	for (i = 0; i < json.length; i++) {
            row = [json[i].date, json[i].count];
	    rows.push(row);
	}

	var data = new google.visualization.DataTable();
	data.addColumn('string', 'Date');
        data.addColumn('number', 'Count');
        data.addRows(rows);

        var options = {'title':'Number of Replies per Day',
                       'width':800,
                       'height':600};

        var chart = new google.visualization.BarChart(document.getElementById('chart_div'));
        chart.draw(data, options);
    }
}

document.getElementById("likesPerDay").onclick = function() {

    const Http = new XMLHttpRequest();
    const url='http://127.0.0.1:5000/dashboard/daily-likes';
    Http.open("GET", url);
    Http.send();
    Http.onreadystatechange=(e)=>{
        var str = Http.responseText;
	var json = JSON.parse(str);
        
	var rows = [];
	var i;
	for (i = 0; i < json.length; i++) {
            row = [json[i].date, json[i].count];
	    rows.push(row);
	}

	var data = new google.visualization.DataTable();
	data.addColumn('string', 'Date');
        data.addColumn('number', 'Count');
        data.addRows(rows);

        var options = {'title':'Number of Likes per Day',
                       'width':800,
                       'height':600};

        var chart = new google.visualization.BarChart(document.getElementById('chart_div'));
        chart.draw(data, options);
    }
}

document.getElementById("dislikesPerDay").onclick = function() {

    const Http = new XMLHttpRequest();
    const url='http://127.0.0.1:5000/dashboard/daily-dislikes';
    Http.open("GET", url);
    Http.send();
    Http.onreadystatechange=(e)=>{
        var str = Http.responseText;
	var json = JSON.parse(str);
        
	var rows = [];
	var i;
	for (i = 0; i < json.length; i++) {
            row = [json[i].date, json[i].count];
	    rows.push(row);
	}

	var data = new google.visualization.DataTable();
	data.addColumn('string', 'Date');
        data.addColumn('number', 'Count');
        data.addRows(rows);

        var options = {'title':'Number of Dislikes per Day',
                       'width':800,
                       'height':600};

        var chart = new google.visualization.BarChart(document.getElementById('chart_div'));
        chart.draw(data, options);
    }
}

document.getElementById("activeUsersPerDay").onclick = function() {

    var date = document.getElementById("activedate").value;

    const Http = new XMLHttpRequest();
    const url='http://127.0.0.1:5000/dashboard/active-users';
    Http.open("GET", url);
    Http.send();
    Http.onreadystatechange=(e)=>{
        var str = Http.responseText;
	var json = JSON.parse(str);
        
	var rows = [];
	var i;
	for (i = 0; i < json[date].length; i++) {
            row = [json[date][i].uname, json[date][i].count];
	    rows.push(row);
	}

	var data = new google.visualization.DataTable();
	data.addColumn('string', 'User');
        data.addColumn('number', 'Count');
        data.addRows(rows);

        var options = {'title':'Number of Active User on ' + date,
                       'width':800,
                       'height':600};

        var chart = new google.visualization.BarChart(document.getElementById('chart_div'));
        chart.draw(data, options);
    }
}

document.getElementById("postsPerDayByUser").onclick = function() {

    var uid = document.getElementById("postsuid").value;

    const Http = new XMLHttpRequest();
    const url='http://127.0.0.1:5000/dashboard/daily-posts/user/' + uid;
    Http.open("GET", url);
    Http.send();
    Http.onreadystatechange=(e)=>{
        var str = Http.responseText;
	var json = JSON.parse(str);
        
	var rows = [];
	var i;
	for (i = 0; i < json.length; i++) {
            row = [json[i].date, json[i].count];
	    rows.push(row);
	}

	var data = new google.visualization.DataTable();
	data.addColumn('string', 'Date');
        data.addColumn('number', 'Count');
        data.addRows(rows);

        var options = {'title':'Number of Posts per Day by UserID ' + uid,
                       'width':800,
                       'height':600};

        var chart = new google.visualization.BarChart(document.getElementById('chart_div'));
        chart.draw(data, options);
    }
}

document.getElementById("reactionsToPost").onclick = function() {

    var pid = document.getElementById("reactionspid").value;

    const Http = new XMLHttpRequest();
    const url='http://127.0.0.1:5000/dashboard/posts/' + pid + '/reactions-count';
    Http.open("GET", url);
    Http.send();
    Http.onreadystatechange=(e)=>{
        var str = Http.responseText;
	var json = JSON.parse(str);
        
	var rows = [];

	if (json.Like) { rows.push(["Like", json.Like.count]); }
	if (json.Dislike) { rows.push(["Dislike", json.Dislike.count]); }

	var data = new google.visualization.DataTable();
	data.addColumn('string', 'Reaction');
        data.addColumn('number', 'Count');
        data.addRows(rows);

        var options = {'title':'Number of Reactions to Post ' + pid,
                       'width':800,
                       'height':600};

        var chart = new google.visualization.BarChart(document.getElementById('chart_div'));
        chart.draw(data, options);
    }
}

document.getElementById("repliesToPost").onclick = function() {

    var pid = document.getElementById("repliespid").value;

    const Http = new XMLHttpRequest();
    const url='http://127.0.0.1:5000/dashboard/posts/' + pid + '/replies';
    Http.open("GET", url);
    Http.send();
    Http.onreadystatechange=(e)=>{
        var str = Http.responseText;
	var json = JSON.parse(str);
        
	var rows = [];

	rows.push(["Replies", json.length]);

	var data = new google.visualization.DataTable();
	data.addColumn('string', 'Replies');
        data.addColumn('number', 'Count');
        data.addRows(rows);

        var options = {'title':'Number of Reactions to Post ' + pid,
                       'width':800,
                       'height':600};

        var chart = new google.visualization.BarChart(document.getElementById('chart_div'));
        chart.draw(data, options);
    }
}
