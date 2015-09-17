<!DOCTYPE html>
<html>
<head>
	<title></title>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" type="text/css" href="styles/bootstrap.css">
    <link rel="stylesheet" type="text/css" href="styles/font-awesome/css/font-awesome.min.css">
    <style type="text/css">
    	html,body,.container{
    		height: 100%;
    	}
    	body{
    		background: #000;
    	}
    	#faq{
    		text-align: center;
    		color: #fff;
    		margin-bottom: 70px;
    	}
    	.faq-box{
    		width: 100%;
    		margin-right: auto;
   			margin-left: auto;
   			color: #fff;
    	}
    	.faq-box p{
    		margin: 0;
    		padding:20px 50px;
    		color: rgba(255,255,255,0.9);
    		line-height: 1.5;
    		font-size: 15px;
    	}

    	.faq-bullet{
    		padding-right: 20px;
    		font-size: 25px;
    		position: relative;
    		top: 4px;
    	}
    	.faq-box .title{
    		border-bottom: 1px solid rgba(255,255,255,0.6);
    		padding-bottom: 12px;
    		font-size: 16px;
    	}
    	.faq-box .title,
    	.faq-bullet{
    		display: inline;
    	}
    	.outer{
    		width: 100%;
    		min-height: 100%;
    		display: table;
    	}

    	.middle{
    		display: table-cell;
    		vertical-align: middle;
    	}

        #close{
            position: absolute;
            color: #fff;
            font-size: 20px;
            right: 14px;
            top: 14px;
        }
        .box-close-preorder{
		    position: absolute;
		    right: 15px;
		    top: 15px;
		    width: 20px;
		    height: 25px;
		}
		.close-preorder{
		    height: 2px;
		    width: 20px;
		    background-color: #fff;
		    -webkit-transition: -webkit-transform .3s;
		    transition: transform .3s;
		    color: #fff;
		}

		.close-preorder.first{
		    -webkit-transform: translate(0, 12px) rotate(-45deg)!important;
		    -o-transform: translate(0, 12px) rotate(-45deg)!important;
		    -ms-transform: translate(0, 12px) rotate(-45deg)!important;
		    -moz-transform: translate(0, 12px) rotate(-45deg)!important;
		    transform: translate(0, 12px) rotate(-45deg)!important;
		}

		.close-preorder.second{
		    -webkit-transform: translate(0, 10px) rotate(45deg)!important;
		    -o-transform: translate(0, 10px) rotate(45deg)!important;
		    -ms-transform: translate(0, 10px) rotate(45deg)!important;
		    -moz-transform: translate(0, 10px) rotate(45deg)!important;
		    transform: translate(0, 10px) rotate(45deg)!important;
		}
    	@media(max-width: 768px){
    		.faq-box .title{
    			font-size: 10px;
    			padding-bottom: 6px;
    		}
    		.faq-bullet {
			    padding-right: 8px;
			    font-size: 15px;
			}
			.faq-box{
				margin-bottom: 4px;
			}
			.faq-box p{
				padding: 10px 26px;
				font-size: 10px;
				text-align: justify;
			}
			#faq {
			    margin: 9px 0;
			    font-size: 15px;
			    text-align: left;
    			padding: 0 26px;
			}
    	}
    	@media only screen and (min-device-width: 320px) and (max-device-width: 568px) and (-webkit-min-device-pixel-ratio: 2) {
    		body{
	    		padding-top: 40px;
	    		margin-bottom: 40px;
	    	}
    		.faq-box .title,
	    	.faq-bullet{
	    		display: block;
	    		float: left;
	    	}
	    	.faq-box .title{
    			width: 80%;
    		}
    		.faq-bullet {
			    width: 9%;
			}
    	}
    </style>
</head>
<body>
	<div class="container">
        <a href="index.php" id="close"><div class="box-close-preorder"><div class="close-preorder first"></div><div class="close-preorder second"></div></div></a>
		<div class="outer">
			<div class="middle">
				<div class="row">
					<div class="col-md-12">
						<h2 id="faq">FAQS</h2>
					</div>
				</div>
				<div class="row">
					<div class="col-md-6">
						<div class="faq-box">
							<span class="faq-bullet"><i class="fa fa-lightbulb-o"></i></span>
							<h4 class="title">Can i see through Bandits when the lights are on?</h4><br>
							<p>Sure, The lights actually take up only a small portion of your viewing area.You can see everything even though the lights are on. That being said, we highly discourage driving or operating heavy machinery with the bandits on.</p>
						</div>
					</div>
					<div class="col-md-6">
						<div class="faq-box">
							<span class="faq-bullet"><i class="fa fa-tint"></i></span>
							<h4 class="title">Is Bandits Waterproof?</h4>
							<p>We have tested the bandits to be able to handle rain or light splashes of water- We do not recommend swimming with it though.</p>
						</div>
					</div>
				</div>
				<div class="row">
					<div class="col-md-6">
						<div class="faq-box">
							<span class="faq-bullet"><i class="fa fa-bolt"></i></span>
							<h4 class="title">How long will the rechargeable battery last on a single charge?</h4>
							<p>We have tested them out and it should last around 6 hours on a single charge. It takes less than 1 hour to completely charge it to full from empty.</p>
						</div>
					</div>
					<div class="col-md-6">
						<div class="faq-box">
							<span class="faq-bullet"><i class="fa fa-cog"></i></span>
							<h4 class="title">What colors are available today? and do you allow customisation?</h4>
							<p>We currently only have two colors- Black and white, but we plan to add more colors in the future so stay tuned.As of right now we only allow customisation to orders above.</p>
						</div>
					</div>
				</div>
				<div class="row">
					<div class="col-md-6">
						<div class="faq-box">
							<span class="faq-bullet"><i class="fa fa-wrench"></i></span>
							<h4 class="title">What happens if I receive a faulty Bandits pair?</h4>
							<p>We test all units before shipping out to our customers. That being said, if your bandits does not work when you receive it - send us a video of the faulty piece to hey@getbandits.com and we will send you another pair free of charge.</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</body>
</html>